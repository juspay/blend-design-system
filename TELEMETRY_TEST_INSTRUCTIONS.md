# 🧪 Telemetry Testing Instructions

## ✅ Status: Ready to Test!

The telemetry system has been successfully implemented and the test environment is ready.

## 🚀 How to Test

### 1. **Open the Test Page**

The development server is running at: **http://localhost:5173/**

### 2. **Open Browser Console**

- Press `F12` (or `Cmd+Option+I` on Mac)
- Go to the **Console** tab
- Keep it open while testing

### 3. **Test the Telemetry**

**Expected Console Output:**
When you click buttons, you should see logs like:

```
🔍 Blend Telemetry: Button
  Event Type: component_mount
  Component Props: { buttonType: "PRIMARY", size: "MEDIUM", hasText: "true" }
  Package Version: 0.0.13
  Session ID: blend_1640995200000_abc123def
  Timestamp: 2021-12-31T12:00:00.000Z
  Environment: development
```

### 4. **Test Scenarios**

#### ✅ **Basic Tests:**

- Click different buttons to see `component_mount` events
- Watch for `component_render` events when props change
- Try the "Dynamic Button" that changes props on each click

#### ✅ **Configuration Tests:**

- Toggle "Enable Telemetry" OFF → No events should appear
- Toggle "Enable Telemetry" ON → Events should resume
- Toggle "Debug Mode" OFF → Events stop appearing in console
- Change "Sampling Rate" to 10% → Only ~10% of events should appear

#### ✅ **Button Variations:**

- Different button types (Primary, Secondary, Success, Danger)
- Different sizes (Small, Medium, Large)
- Buttons with icons (Leading, Trailing, Both)
- Different states (Normal, Loading, Disabled, Full Width)

### 5. **What Events to Expect**

| Event Type          | When It Triggers                           |
| ------------------- | ------------------------------------------ |
| `component_mount`   | When button first renders                  |
| `component_render`  | When button props change                   |
| `component_unmount` | When button is removed (rare in this demo) |

### 6. **Data Collected**

The telemetry safely tracks:

- Component name (`"Button"`)
- Safe props like `buttonType`, `size`, `disabled`, etc.
- Anonymous session ID
- Package version
- Environment info

**❌ NOT collected:**

- Personal data
- Button text content
- Function implementations
- URLs or sensitive information

## 🔧 Troubleshooting

### No Events in Console?

1. Check that "Enable Telemetry" is ON
2. Check that "Debug Mode" is ON
3. Refresh the page and try again
4. Check browser console for any errors

### Events Not Appearing for Some Buttons?

- Check the "Sampling Rate" - if set to 10%, only ~10% of events appear
- Try clicking multiple times

### Errors in Console?

- Make sure the blend package built successfully
- Check that all imports are working correctly

## 🎯 Success Criteria

You've successfully tested the telemetry if you can:

1. ✅ See telemetry events in browser console
2. ✅ Toggle telemetry on/off and see the difference
3. ✅ See different event types (mount, render)
4. ✅ See different button configurations tracked
5. ✅ Confirm no sensitive data is collected

## 📊 Next Steps

Once verified:

1. Add telemetry to other components (Modal, DataTable, etc.)
2. Set up backend collection endpoint in `apps/blend-monitor`
3. Create analytics dashboard
4. Implement production optimizations (batching, retry logic)

---

**🔗 Test URL:** http://localhost:5173/
**📍 Console:** Press F12 → Console tab
**⚡ Status:** Server running, ready to test!
