"use client";

import { useEffect, useState, useCallback } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

interface BingoItem {
  id: string;
  text: string;
}

function useYjs(roomName: string) {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<WebrtcProvider | null>(null);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new WebrtcProvider(roomName, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yProvider.disconnect();
      yDoc.destroy();
    };
  }, [roomName]);

  return { doc, provider };
}

export function CollaborativeBingoEditor({ code }: { code: string }) {
  const [items, setItems] = useState<BingoItem[]>([]);
  const { doc, provider } = useYjs(`bingo-collaboration-${code}`);

  const updateItems = useCallback(() => {
    if (!doc) return;
    const sharedData = doc.getMap("shared-bingo-data");
    const newItems = Array.from(sharedData.entries()).map(([id, text]) => ({
      id,
      text: text as string,
    }));
    setItems(newItems);
  }, [doc]);

  useEffect(() => {
    if (!doc) return;

    const sharedData = doc.getMap("shared-bingo-data");
    sharedData.observe(updateItems);
    updateItems();

    return () => {
      sharedData.unobserve(updateItems);
      provider?.disconnect();
    };
  }, [doc, provider, updateItems]);

  const addItem = useCallback(() => {
    if (!doc) return;
    const sharedData = doc.getMap("shared-bingo-data");
    const id = Date.now().toString();
    sharedData.set(id, "");
  }, [doc]);

  const updateItem = useCallback(
    (id: string, text: string) => {
      if (!doc) return;
      const sharedData = doc.getMap("shared-bingo-data");
      sharedData.set(id, text);
    },
    [doc]
  );

  const deleteItem = useCallback(
    (id: string) => {
      if (!doc) return;
      const sharedData = doc.getMap("shared-bingo-data");
      sharedData.delete(id);
    },
    [doc]
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Collaborative Bingo Editor</h2>
      <p>Room Code: {code}</p>
      <button
        onClick={addItem}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Item
      </button>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center space-x-2">
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(item.id, e.target.value)}
              className="flex-grow px-2 py-1 border rounded"
            />
            <button
              onClick={() => deleteItem(item.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
