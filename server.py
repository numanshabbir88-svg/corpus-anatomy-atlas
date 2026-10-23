"""Small optional local server for Corpus: compressed code and browser image caching.
The atlas also works directly from index.html; no server or Python packages required for offline use.
"""
from functools import lru_cache
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import gzip
import io
import mimetypes
import os

ROOT = Path(__file__).resolve().parent

@lru_cache(maxsize=24)
def packed(path, stamp, size):
    data = Path(path).read_bytes()
    return data, gzip.compress(data, compresslevel=6)

class AtlasHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        if self.path.split('?')[0].startswith('/img/'):
            self.send_header('Cache-Control', 'public, max-age=604800')
        elif self.path.split('?')[0].endswith(('.js', '.css')):
            self.send_header('Cache-Control', 'public, max-age=86400')
        else:
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, 'index.html')
        if os.path.isfile(path) and path.endswith(('.html', '.css', '.js', '.svg', '.txt', '.json')):
            st = os.stat(path)
            etag = f'"{st.st_mtime_ns:x}-{st.st_size:x}"'
            if self.headers.get('If-None-Match') == etag:
                self.send_response(304)
                self.send_header('ETag', etag)
                self.end_headers()
                return None
            original, compressed = packed(path, st.st_mtime_ns, st.st_size)
            use_gzip = 'gzip' in self.headers.get('Accept-Encoding', '').lower()
            data = compressed if use_gzip else original
            self.send_response(200)
            self.send_header('Content-type', mimetypes.guess_type(path)[0] or 'application/octet-stream')
            self.send_header('Content-Length', str(len(data)))
            self.send_header('ETag', etag)
            self.send_header('Vary', 'Accept-Encoding')
            if use_gzip:
                self.send_header('Content-Encoding', 'gzip')
            self.end_headers()
            return io.BytesIO(data)
        return super().send_head()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=3000)
    parser.add_argument('--root', default=str(ROOT), help='Directory to serve (source or generated site)')
    args = parser.parse_args()
    ROOT = Path(args.root).resolve()
    server = ThreadingHTTPServer(('0.0.0.0', args.port), AtlasHandler)
    print(f'Corpus preview ready on port {args.port}', flush=True)
    server.serve_forever()
