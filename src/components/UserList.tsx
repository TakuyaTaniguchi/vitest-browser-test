import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

interface UserListProps {
  fetchUsers?: () => Promise<User[]>
}

export function UserList({ fetchUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        let data: User[]
        if (fetchUsers) {
          // テストやモック用のカスタムフェッチ関数
          data = await fetchUsers()
        } else {
          // 本番用：実際のJSONファイルを読み込む
          const response = await fetch('/src/data/users.json')
          if (!response.ok) {
            throw new Error('Failed to fetch users')
          }
          data = await response.json()
        }

        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [fetchUsers])

  if (loading) {
    return <div data-testid="loading">読み込み中...</div>
  }

  if (error) {
    return <div data-testid="error">エラー: {error}</div>
  }

  return (
    <div data-testid="user-list">
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} data-testid={`user-${user.id}`}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
