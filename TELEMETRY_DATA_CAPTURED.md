# 📊 Button Component Telemetry Data

## ✅ Enhanced Data Collection

We now capture **ALL actual Button props** with accurate, real-time values - no hardcoded or dummy data!

## 📋 Complete List of Captured Data

### 🔧 **Core Button Props** (Actual Values)

| Property              | Type   | Description                        | Example Values                                      |
| --------------------- | ------ | ---------------------------------- | --------------------------------------------------- |
| `buttonType`          | string | Button variant type                | `"primary"`, `"secondary"`, `"danger"`, `"success"` |
| `size`                | string | Button size                        | `"sm"`, `"md"`, `"lg"`                              |
| `subType`             | string | Button sub-variant                 | `"default"`, `"iconOnly"`, `"inline"`               |
| `disabled`            | string | Whether button is disabled         | `"true"`, `"false"`                                 |
| `loading`             | string | Whether button is in loading state | `"true"`, `"false"`                                 |
| `fullWidth`           | string | Whether button takes full width    | `"true"`, `"false"`                                 |
| `justifyContent`      | string | Content alignment                  | `"center"`, `"flex-start"`, `"flex-end"`            |
| `buttonGroupPosition` | string | Position in button group           | `"left"`, `"center"`, `"right"`                     |

### 🎯 **Derived Analytics Props** (Computed)

| Property          | Type   | Description                      | Example Values      |
| ----------------- | ------ | -------------------------------- | ------------------- |
| `hasLeadingIcon`  | string | Whether button has leading icon  | `"true"`, `"false"` |
| `hasTrailingIcon` | string | Whether button has trailing icon | `"true"`, `"false"` |
| `hasText`         | string | Whether button has text content  | `"true"`, `"false"` |
| `hasBothIcons`    | string | Whether button has both icons    | `"true"`, `"false"` |

### 🔄 **Legacy/Alias Props** (For Consistency)

| Property     | Type   | Description          | Example Values      |
| ------------ | ------ | -------------------- | ------------------- |
| `isLoading`  | string | Alias for `loading`  | `"true"`, `"false"` |
| `isDisabled` | string | Alias for `disabled` | `"true"`, `"false"` |

### 🌐 **HTML Button Attributes** (When Present)

| Property   | Type   | Description        | Example Values                    |
| ---------- | ------ | ------------------ | --------------------------------- |
| `type`     | string | HTML button type   | `"button"`, `"submit"`, `"reset"` |
| `role`     | string | ARIA role          | `"button"`, `"menuitem"`          |
| `tabIndex` | string | Tab order          | `"0"`, `"-1"`, `"1"`              |
| `form`     | string | Associated form ID | `"loginForm"`, `"searchForm"`     |
| `name`     | string | Form field name    | `"submitBtn"`, `"cancelBtn"`      |
| `value`    | string | Form field value   | `"save"`, `"delete"`              |

## 📈 **Example Telemetry Events**

### Basic Primary Button

```json
{
    "eventType": "component_mount",
    "componentName": "Button",
    "componentProps": {
        "buttonType": "primary",
        "size": "md",
        "subType": "default",
        "disabled": "false",
        "loading": "false",
        "fullWidth": "false",
        "justifyContent": "center",
        "hasLeadingIcon": "false",
        "hasTrailingIcon": "false",
        "hasText": "true",
        "hasBothIcons": "false",
        "isLoading": "false",
        "isDisabled": "false"
    },
    "packageVersion": "0.0.13",
    "sessionId": "blend_1640995200000_abc123def",
    "environment": "development"
}
```

### Complex Button with Icons

```json
{
    "eventType": "component_render",
    "componentName": "Button",
    "componentProps": {
        "buttonType": "secondary",
        "size": "lg",
        "subType": "default",
        "disabled": "false",
        "loading": "false",
        "fullWidth": "true",
        "justifyContent": "center",
        "hasLeadingIcon": "true",
        "hasTrailingIcon": "true",
        "hasText": "true",
        "hasBothIcons": "true",
        "type": "submit",
        "form": "userForm"
    }
}
```

### Icon-Only Loading Button

```json
{
    "eventType": "component_render",
    "componentName": "Button",
    "componentProps": {
        "buttonType": "danger",
        "size": "sm",
        "subType": "iconOnly",
        "disabled": "false",
        "loading": "true",
        "fullWidth": "false",
        "hasLeadingIcon": "true",
        "hasTrailingIcon": "false",
        "hasText": "false",
        "hasBothIcons": "false",
        "isLoading": "true"
    }
}
```

## 🔒 **Privacy & Security**

### ✅ **Safe Data Collected:**

- Component configuration and state
- Anonymous usage patterns
- Performance and interaction data
- Accessibility attributes

### ❌ **Data NOT Collected:**

- Button text content (privacy)
- Function implementations
- Click handlers or callbacks
- User-generated content
- Personal information
- URLs or paths

### 🛡️ **Data Sanitization:**

- **Functions**: Converted to `"[Function]"`
- **React Nodes**: Converted to `"[ReactNode]"`
- **Objects**: Converted to string representation
- **Primitives**: Converted to strings for consistency

## 🎯 **Analytics Insights Available**

With this data, you can analyze:

### 📊 **Usage Patterns**

- Most popular button types and sizes
- Icon usage patterns (leading vs trailing vs both)
- Button states distribution (loading, disabled, etc.)
- Full-width vs inline button preferences

### 🎨 **Design System Adoption**

- Which button variants are most used
- Accessibility attribute usage
- Button group vs standalone usage
- Form integration patterns

### 🚀 **Performance Metrics**

- Component mount/unmount patterns
- Re-render frequency
- Props change patterns
- State transition tracking

### 📱 **User Experience**

- Button state combinations
- Interaction patterns
- Form integration usage
- Accessibility compliance

## 🧪 **Test the Enhanced Telemetry**

Visit http://localhost:5173/ and:

1. **Click different buttons** to see accurate prop values
2. **Try the Dynamic Button** that changes props on each click
3. **Toggle states** (loading, disabled, etc.) to see real-time changes
4. **Check console** for detailed, accurate telemetry events

Every prop value you see is **real and accurate** - no dummy data! 🎉
