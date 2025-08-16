import React, { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

const ABI = [
  { "type":"function", "name":"getCount", "stateMutability":"view", "inputs":[], "outputs":[{"name":"","type":"uint256"}] },
  { "type":"function", "name":"increment", "stateMutability":"nonpayable", "inputs":[], "outputs":[] }
];

const CONTRACT = import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS;

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: count, refetch } = useReadContract({
    address: CONTRACT,
    abi: ABI,
    functionName: "getCount",
    query: { enabled: Boolean(CONTRACT) },
  });

  const [hash, setHash] = useState(null);
  const { writeContract, isPending: isWriting, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const onIncrement = async () => {
    try {
      const txHash = await writeContract({
        address: CONTRACT,
        abi: ABI,
        functionName: "increment",
        args: [],
      });
      setHash(txHash);
    } catch (e) {
      console.error(e);
    }
  };

  if (!import.meta.env.VITE_PUBLIC_RPC_URL) {
    return <div className="p-6">Missing <code>VITE_PUBLIC_RPC_URL</code> in <code>.env</code></div>
  }
  if (!CONTRACT) {
    return <div className="p-6">Set <code>VITE_PUBLIC_CONTRACT_ADDRESS</code> in <code>.env</code> after deploying the contract.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Counter DApp</h1>
        {isConnected ? (
          <div className="flex items-center gap-3">
            <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">{address?.slice(0,6)}…{address?.slice(-4)}</span>
            <button className="px-3 py-1 rounded-md bg-gray-800 text-white" onClick={() => disconnect()}>Disconnect</button>
          </div>
        ) : (
          <button
            className="px-3 py-1 rounded-md bg-blue-600 text-white disabled:opacity-50"
            disabled={isConnecting}
            onClick={() => connect({ connector: connectors[0] })}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </header>

      <section className="p-4 rounded-2xl bg-white shadow">
        <p className="text-sm text-gray-500 mb-2">Current count:</p>
        <p className="text-5xl font-bold">{typeof count === "bigint" ? Number(count) : (count ?? "—")}</p>
        <div className="mt-4 flex gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
            onClick={onIncrement}
            disabled={!isConnected || isWriting || isConfirming}
          >
            {isWriting ? "Sending..." : isConfirming ? "Confirming..." : "Increment"}
          </button>
          <button className="px-4 py-2 rounded-xl border" onClick={() => refetch?.()}>Refresh</button>
        </div>
        {hash && (
          <p className="text-xs mt-3 break-all">
            Tx hash: <code>{hash}</code>
          </p>
        )}
        {writeError && <p className="text-xs text-red-600 mt-2">{writeError.shortMessage || writeError.message}</p>}
        {isConfirmed && <p className="text-sm text-green-600 mt-2">Confirmed! Refresh to see updated count.</p>}
      </section>

      <footer className="text-xs text-gray-500">
        Chain: Sepolia (11155111). Make sure your wallet is on Sepolia and you have a little test ETH.
      </footer>
    </div>
  );
}