# Build Optimization Guide

## AWS Amplify Build Caching

This project is configured with aggressive caching to speed up AWS Amplify builds.

### What Gets Cached

1. **node_modules/** - All npm dependencies (saves ~30-60s per build)
2. **.next/cache/** - Next.js build cache including webpack cache
3. **.npm/** - npm's local cache directory
4. **package-lock.json** - Ensures consistent dependency resolution

### Expected Build Time Improvements

- First build: ~2-3 minutes
- Subsequent builds (with cache): ~45-60 seconds
- Builds with only content changes: ~30-45 seconds

### Cache Configuration

The caching is configured in `amplify.yml`:

```yaml
cache:
  paths:
    - node_modules/**/*
    - .next/cache/**/*
    - .npm/**/*
    - package-lock.json
```

### Build Optimizations Applied

1. **npm ci optimizations**:
   - `--cache .npm` - Use local npm cache
   - `--prefer-offline` - Use cached packages when possible
   - `--no-audit` - Skip security audit during CI
   - `--no-fund` - Skip funding messages

2. **Memory allocation**:
   - `NODE_OPTIONS="--max_old_space_size=4096"` - Allocate 4GB for Node.js

3. **Next.js caching**:
   - File system cache enabled
   - Webpack persistent caching
   - Optimized chunk splitting

### Monitoring Build Performance

You can monitor build times in the AWS Amplify console:

1. Go to your app in AWS Amplify
2. Click on "Build settings"
3. View "Build history" for timing information

### Clearing Cache

If you encounter issues, you can clear the cache:

1. In AWS Amplify Console: App settings → Build settings → Clear cache
2. Or trigger a clean build by updating amplify.yml

### Local Build Testing

Always test builds locally before pushing:

```bash
# Regular build
npm run build

# Clean build (removes all caches)
npm run clean && npm ci && npm run build

# Clear only Next.js cache
npm run cache:clear
```