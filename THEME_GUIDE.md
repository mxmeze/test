# Theme Configuration Guide

This application uses a modern, configurable color system that makes it easy to change the entire color scheme.

## Quick Start

To change the color scheme of the entire application:

1. Open `src/styles/theme.config.scss`
2. Modify the color values (especially `$theme-primary-500` for the main brand color)
3. Save the file - the entire application will update automatically!

## Color System Structure

### Primary Colors
The primary color palette uses a 50-900 scale (similar to Tailwind CSS):
- `$theme-primary-50` - Lightest shade
- `$theme-primary-500` - **Main brand color** (change this!)
- `$theme-primary-900` - Darkest shade

### Neutral Colors
Neutral grays for text, borders, and backgrounds:
- `$theme-neutral-50` - Lightest gray
- `$theme-neutral-900` - Darkest gray

### Semantic Colors
Pre-defined colors for common UI states:
- `$theme-success` - Green for success messages
- `$theme-warning` - Orange for warnings
- `$theme-error` - Red for errors
- `$theme-info` - Blue for informational messages

## How to Change Colors

### Example: Change Brand Color to Purple

```scss
// In src/styles/theme.config.scss

// Change from blue to purple
$theme-primary-500: #8b5cf6;  // Purple-500
$theme-primary-600: #7c3aed;  // Purple-600
$theme-primary-700: #6d28d9;  // Purple-700
// ... update other shades as needed
```

### Example: Change Brand Color to Green

```scss
// In src/styles/theme.config.scss

$theme-primary-500: #10b981;  // Green-500
$theme-primary-600: #059669;  // Green-600
$theme-primary-700: #047857;  // Green-700
// ... update other shades as needed
```

## Using Colors in Components

### In SCSS Files

```scss
@use '../../../styles/variables' as vars;

.my-component {
  background: vars.$color-primary;
  color: vars.$color-text-strong;
  border: 1px solid vars.$color-border;
}
```

### In CSS/HTML (Using CSS Custom Properties)

All theme colors are available as CSS custom properties:

```css
.my-component {
  background: var(--theme-primary-600);
  color: var(--theme-text-primary);
  border: 1px solid var(--theme-border);
}
```

## Available CSS Custom Properties

All colors are exported as CSS custom properties with the `--theme-` prefix:

- `--theme-primary-50` through `--theme-primary-900`
- `--theme-neutral-50` through `--theme-neutral-900`
- `--theme-success`, `--theme-warning`, `--theme-error`, `--theme-info`
- `--theme-surface`, `--theme-surface-elevated`, `--theme-surface-subtle`
- `--theme-text-primary`, `--theme-text-secondary`, `--theme-text-inverse`
- `--theme-border`, `--theme-border-subtle`, `--theme-border-strong`

## File Structure

```
src/styles/
├── theme.config.scss    ← CHANGE COLORS HERE!
├── variables.scss       ← Uses theme.config.scss
└── styles.scss          ← Imports theme.config.scss
```

## Tips

1. **Use a color palette generator**: Tools like [Coolors](https://coolors.co) or [Tailwind Color Generator](https://www.tailwindshades.com/) can help generate consistent color scales.

2. **Maintain contrast**: Ensure text remains readable when changing colors. The theme includes proper text colors for light/dark backgrounds.

3. **Test thoroughly**: After changing colors, test all pages and components to ensure everything looks good.

4. **Keep it consistent**: If you change the primary color, update all shades (50-900) to maintain visual harmony.

## Future: Dark Mode Support

The theme system is prepared for dark mode. To enable it, uncomment and configure the dark mode section in `theme.config.scss`:

```scss
[data-theme="dark"] {
  --theme-surface: #{$theme-neutral-900};
  --theme-text-primary: #{$theme-neutral-50};
  // ... etc
}
```

Then toggle dark mode by adding `data-theme="dark"` to the `<html>` element.

