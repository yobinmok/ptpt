// https://velog.io/@ckstn0777/Context-API%EC%9D%98-%EC%B5%9C%EB%8C%80-%EB%8B%A8%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C
import React, { useMemo } from "react"
import { createContext, useContext, useState } from "react"

const initialState = {
  id: "id 초기값"
}

// Context API 사용 단계
// createContext -> Provider로 감싸기 -> useContext를 통해 사용
const UserContext = createContext(null)

export function UserProvider({ children }) {
    // useState로 감싸는 이유: Provider 상위 컴포넌트가 리렌더링 되더라도
    // initialState는 바뀌지 않도록 -> 참조 동일성을 유지하기 위해
    const [state, setState] = useState(initialState)

    // 전역 상태 값을 수정하는 action
    // useState, useMemo를 통해 UserProvider 리렌더링 시에도 
    // 하위 Context API를 구독하는 컴포넌트가 영향을 받지 않도록
    const actions = useMemo(
        () => ({
            change(key, value) {
                setState(prev => ({ ...prev, [key]: value }))
            },
            reset() {
                setState(initialState)
            }
        }),
        []
    )

    const value = useMemo(() => ({ state, actions }), [state, actions])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error("useUserContext must be used within UserProvider")
  }
  return context
}
