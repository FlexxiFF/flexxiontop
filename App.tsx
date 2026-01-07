12:13:52 PM: Netlify Build                                                 
12:13:52 PM: ────────────────────────────────────────────────────────────────
12:13:52 PM: ​
12:13:52 PM: ❯ Version
12:13:52 PM:   @netlify/build 35.5.9
12:13:52 PM: ​
12:13:52 PM: ❯ Flags
12:13:52 PM:   accountId: 68313254809e319d5bf34277
12:13:52 PM:   baseRelDir: true
12:13:52 PM:   buildId: 695df991db1f980008396a78
12:13:52 PM:   deployId: 695df991db1f980008396a7a
12:13:52 PM: ​
12:13:52 PM: ❯ Current directory
12:13:52 PM:   /opt/build/repo
12:13:52 PM: ​
12:13:52 PM: ❯ Config file
12:13:52 PM:   /opt/build/repo/netlify.toml
12:13:52 PM: ​
12:13:52 PM: ❯ Context
12:13:52 PM:   production
12:13:52 PM: ​
12:13:52 PM: build.command from netlify.toml                               
12:13:52 PM: ────────────────────────────────────────────────────────────────
12:13:52 PM: ​
12:13:52 PM: $ npm run build
12:13:52 PM: > lumina-holographic-links@2.5.1 build
12:13:52 PM: > tsc && vite build
12:13:53 PM: App.tsx(3,32): error TS2307: Cannot find module '@/components/AnimatedBackground' or its corresponding type declarations.
12:13:53 PM: App.tsx(4,28): error TS2307: Cannot find module '@/components/SocialLinkCard' or its corresponding type declarations.
12:13:53 PM: App.tsx(5,24): error TS2307: Cannot find module '@/components/AdminPanel' or its corresponding type declarations.
12:13:53 PM: App.tsx(8,31): error TS2307: Cannot find module '@/services/geminiService' or its corresponding type declarations.
12:13:53 PM: App.tsx(9,37): error TS2307: Cannot find module '@/services/firebaseAuthService' or its corresponding type declarations.
12:13:53 PM: ​
12:13:53 PM: "build.command" failed                                        
12:13:53 PM: ────────────────────────────────────────────────────────────────
12:13:53 PM: ​
12:13:53 PM:   Error message
12:13:53 PM:   Command failed with exit code 2: npm run build (https://ntl.fyi/exit-code-2)
12:13:53 PM: ​
12:13:53 PM:   Error location
12:13:53 PM:   In build.command from netlify.toml:
12:13:53 PM:   npm run build
12:13:53 PM: ​
12:13:53 PM:   Resolved config
12:13:53 PM:   build:
12:13:53 PM:     command: npm run build
12:13:53 PM:     commandOrigin: config
12:13:53 PM:     environment:
12:13:53 PM:       - NODE_VERSION
12:13:53 PM:     publish: /opt/build/repo/dist
12:13:53 PM:     publishOrigin: config
12:13:53 PM:   redirects:
12:13:54 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
12:13:54 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
12:13:54 PM: Failing build: Failed to build site
12:13:54 PM: Finished processing build request in 15.404s
12:13:54 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
