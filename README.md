# Minido

**Just a place to add tasks and free your mind.**

[![Minido Demo](https://github.com/thiagomv-dev/minido-app/raw/refs/heads/main/demo.mp4)](https://github.com/user-attachments/assets/834a4b2c-a17e-4fb4-94b5-7d915660aaa4)

## Installation

Follow these steps to clone, build, and install Minido:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/tools/install)

### Step by Step

1. **Clone the repository**

   ```bash
   git clone https://github.com/thiagomv-dev/minido-app.git
   cd minido-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Local development (optional)**

   ```bash
   npm run tauri dev
   ```

4. **Build and Install**

   ```bash
   npm run build:dmg
   ```

   This command will build the application and automatically open the DMG installer. Simply drag the Minido application to your Applications folder to complete the installation.
