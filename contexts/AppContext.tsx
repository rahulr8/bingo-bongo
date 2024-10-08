"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface BingoCard {
  id: string
  title: string
  items: string[]
}

interface AppContextType {
  currentCard: BingoCard | null
  setCurrentCard: (card: BingoCard | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentCard, setCurrentCard] = useState<BingoCard | null>(null)

  return (
    <AppContext.Provider value={{ currentCard, setCurrentCard }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}