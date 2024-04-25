import http.server
import socketserver

# Define additional MIME types
additional_mime_types = {
    '.js': 'application/javascript',
    # Add more MIME types as needed
}

# Extend the default MIME types mapping
http.server.SimpleHTTPRequestHandler.extensions_map.update(additional_mime_types)

# Specify the port to run the server on
PORT = 8000

# Start the HTTP server
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
