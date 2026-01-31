import ctypes
import json
import os

# Load the shared library
lib_path = os.path.abspath("plugins/antigravity-auth/libAntigravityAuth.dylib")
try:
    lib = ctypes.CDLL(lib_path)
except OSError as e:
    print(f"Error loading library: {e}")
    exit(1)

# Define return types
lib.plugin_init.restype = ctypes.c_void_p
lib.plugin_get_manifest.restype = ctypes.c_char_p
lib.plugin_invoke.restype = ctypes.c_char_p

# Test plugin_init
ctx = lib.plugin_init()
print(f"Context initialized: {ctx}")

# Test plugin_get_manifest
manifest_bytes = lib.plugin_get_manifest()
manifest = json.loads(manifest_bytes.decode('utf-8'))
print(f"Manifest loaded: {manifest['name']} v{manifest['version']}")

# Test plugin_invoke
tool_name = "antigravity-auth.login".encode('utf-8')
args = "{}".encode('utf-8')
response_bytes = lib.plugin_invoke(ctx, tool_name, args)
response = json.loads(response_bytes.decode('utf-8'))
print(f"Invoke response: {json.dumps(response, indent=2)}")

# Verify expected response structure
if response.get("status") == "success" and "data" in response:
    print("SUCCESS: Plugin responded correctly.")
else:
    print("FAILURE: Unexpected response format.")
