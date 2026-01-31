use std::ffi::{CStr, CString};
use std::os::raw::{c_char, c_void};
use serde::Serialize;
use serde_json::Value;

struct PluginContext {
    _placeholder: i32,
}

#[derive(Serialize)]
struct Response {
    status: String,
    message: String,
    data: Option<Value>,
}

#[no_mangle]
pub extern "C" fn plugin_init() -> *mut c_void {
    let ctx = Box::new(PluginContext { _placeholder: 0 });
    Box::into_raw(ctx) as *mut c_void
}

#[no_mangle]
pub extern "C" fn plugin_get_manifest() -> *const c_char {
    let manifest = include_str!("../manifest.json");
    let c_str = CString::new(manifest).unwrap_or_else(|_| CString::new("{}").unwrap());
    c_str.into_raw()
}

#[no_mangle]
pub extern "C" fn plugin_invoke(_ctx: *mut c_void, tool: *const c_char, args: *const c_char) -> *const c_char {
    if tool.is_null() {
        return CString::new("{\"error\": \"Null tool pointer\"}").unwrap().into_raw();
    }

    let tool_str = unsafe { CStr::from_ptr(tool).to_str().unwrap_or("") };
    let args_str = if !args.is_null() {
        unsafe { CStr::from_ptr(args).to_str().unwrap_or("{}") }
    } else {
        "{}"
    };

    let args_json: Value = serde_json::from_str(args_str).unwrap_or(Value::Null);

    let response = match tool_str {
        "antigravity-auth.login" => {
             // In a real native implementation, we would start a local server or open a browser here.
             // Since we are in a headless environment/transition phase, we return a structured response.
             Response {
                status: "success".to_string(),
                message: "Native login flow not fully implemented. Please use the TypeScript extension for OAuth.".to_string(),
                data: Some(serde_json::json!({ "todo": "implement_native_oauth", "args_received": args_json })),
             }
        },
        "antigravity-auth.logout" => {
             Response {
                status: "success".to_string(),
                message: "Logged out (simulated).".to_string(),
                data: None,
             }
        },
        _ => {
            Response {
                status: "error".to_string(),
                message: format!("Unknown tool: {}", tool_str),
                data: None,
            }
        }
    };

    let json_response = serde_json::to_string(&response).unwrap_or("{\"status\":\"error\",\"message\":\"JSON serialization error\"}".to_string());
    let c_response = CString::new(json_response).unwrap();
    c_response.into_raw()
}
