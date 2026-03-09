'use client'

import { useState } from 'react'
import { Bell, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Notification {
    id: string
    title: string
    description: string
    timestamp: string
    isRead: boolean
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '2 hours ago',
            isRead: true,
        },
        {
            id: '2',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '3 hours ago',
            isRead: true,
        },
        {
            id: '3',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '5 hours ago',
            isRead: false,
        },
        {
            id: '4',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '1 day ago',
            isRead: false,
        },
        {
            id: '5',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '2 days ago',
            isRead: false,
        },
        {
            id: '6',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '3 days ago',
            isRead: false,
        },
        {
            id: '7',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '4 days ago',
            isRead: false,
        },
        {
            id: '8',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '5 days ago',
            isRead: false,
        },
        {
            id: '9',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '1 week ago',
            isRead: false,
        },
        {
            id: '10',
            title: 'New Product Launch',
            description: 'Check out our latest product features and updates',
            timestamp: '2 weeks ago',
            isRead: false,
        },
    ])

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((notif) => notif.id !== id))
    }

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        )
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Notifications</h1>
            </div>

            <div className="space-y-2">
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className={`p-4 cursor-pointer transition-colors ${notification.isRead
                                ? 'bg-white hover:bg-gray-50'
                                : 'bg-blue-50 hover:bg-blue-100'
                            }`}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm text-gray-900">
                                    {notification.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {notification.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {notification.timestamp}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                }}
                                className="ml-2"
                            >
                                <Trash2 className="w-4 h-4 text-gray-500" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
