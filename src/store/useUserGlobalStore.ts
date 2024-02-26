import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IUserGlobalStore {
    user: IAuthenticatedUser|null
    updateUser: (user: IAuthenticatedUser|null) => void
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set, get) => ({
            user: null,
            updateUser: (user) => {
                set({
                    user,
                })
            },
        }),
        {
            name: "travel-app-project-it-tdt",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)

export default useUserGlobalStore