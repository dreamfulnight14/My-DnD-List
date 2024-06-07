'use client'

import Head from 'next/head'
import { Inter } from 'next/font/google'

import MyDragList from './components/MyDragList'

export default function Home() {
  return (
    <div className="min-h-screen bg-black p-6" style={{ fontFamily: 'Gelion' }}>
      <Head>
        <title>Draggable List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-2xl mx-auto">
        <MyDragList />
      </main>
    </div>
  )
}
