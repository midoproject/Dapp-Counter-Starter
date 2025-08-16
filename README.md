# Counter DApp (EVM) - Hardhat + React (Vite) + Wagmi

A minimal, production-ready starter to learn fullstack Web3:
- **Smart contract**: Solidity `Counter` with `getCount()` and `increment()`.
- **Tooling**: Hardhat + Toolbox, dotenv.
- **Frontend**: Vite + React + Wagmi v2 + Viem + Tailwind.
- **Network**: Sepolia testnet by default.

---

## 0) Prerequisites
- Node.js 18+ (recommended 20+), Git.
- A wallet (MetaMask).
- Sepolia test ETH (Google “Sepolia faucet” for options).

> Android (Termux) quick setup:
```bash
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git openssl-tool python
node -v && npm -v && git --version
```

---

## 1) Deploy the contract (Sepolia)
```bash
cd contracts
npm install
cp .env.example .env
# Edit .env → put your PRIVATE_KEY (no quotes) & RPC_URL (e.g. Infura/Alchemy)
# PRIVATE_KEY=0xYOUR_PRIVATE_KEY
# RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY

npx hardhat compile
npm run deploy:sepolia
# Copy the printed contract address (0x...)
```

---

## 2) Run the frontend
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env → fill VITE_PUBLIC_CONTRACT_ADDRESS (from step 1),
# VITE_PUBLIC_RPC_URL (same as RPC_URL), and keep CHAIN_ID = 11155111
npm run dev
# Open the URL it prints (usually http://localhost:5173)
```

App actions:
- Connect wallet (MetaMask).
- Read current count from contract.
- Click **Increment** → sign tx → wait to confirm.

---

## 3) Push to GitHub (first time)
Create an empty repo on GitHub. Then run:
```bash
git init
git config user.name "YourName"
git config user.email "you@example.com"
git add .
git commit -m "feat: initial counter dapp"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

> If asked for a password, use a **GitHub Personal Access Token (PAT)**, not your account password.
Create at: GitHub → Settings → Developer settings → **Personal access tokens (classic)** →
scopes: `repo`. Paste the token when prompted.

---

## 4) Common pitfalls
- `Authentication failed`: use a PAT for `git push`. Check `git remote -v` URL and your `<username>/<repo>`.
- `Invalid or missing PRIVATE_KEY/RPC_URL`: ensure `.env` exists in `contracts/` and values are correct.
- `No Sepolia ETH`: get test ETH from a faucet and ensure MetaMask network is **Sepolia**.

---

## 5) What’s inside?

### contracts/
- `contracts/Counter.sol` — simple onchain counter
- `scripts/deploy.js` — deploys to Sepolia
- `hardhat.config.js` — network + plugins
- `package.json` — scripts/deps
- `.env.example`

### frontend/
- Vite + React app
- Wagmi v2 + Viem setup
- Tailwind pre-configured
- `.env.example`

---

## 6) Next steps
- Add `decrement()`, events list, or a simple “guestbook”.
- Verify contract on Etherscan; add a `verify` script.
- Ship the frontend (Vercel/Netlify) and point it to your deployed address.
```
```
## ©️ Project Lisense by Mido
