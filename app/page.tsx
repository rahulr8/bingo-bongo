"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Bingo } from 'lucide-react'

export default function Home() {
  const [joinCode, setJoinCode] = useState('')

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-3xl font-bold">
            <Bingo className="mr-2 h-8 w-8" />
            Bingo Collaboration
          </CardTitle>
          <CardDescription className="text-center">
            Create or join a collaborative bingo card
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/create" passHref>
            <Button className="w-full">Create New Bingo Card</Button>
          </Link>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter join code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <Button
              disabled={!joinCode}
              onClick={() => {
                console.log('Joining with code:', joinCode)
              }}
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}