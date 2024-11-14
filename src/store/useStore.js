import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      sales: [],
      commissions: [],
      referrals: [],
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user }),
      
      logout: () => {
        set({ user: null, sales: [], commissions: [], referrals: [] })
        localStorage.removeItem('aibusinessolutions-storage')
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      updateUserProfile: (profileData) => set(state => ({
        user: state.user ? { ...state.user, ...profileData } : null
      })),
      
      updateProfileImage: (imageUrl) => set(state => ({
        user: state.user ? { ...state.user, profileImage: imageUrl } : null
      })),

      getReferralLink: (productId) => `aibusinessolutions.com/ref/${productId}`,
      
      clearPersistedState: () => {
        localStorage.removeItem('aibusinessolutions-storage')
        set({ user: null, sales: [], commissions: [], referrals: [] })
      }
    }),
    {
      name: 'aibusinessolutions-storage',
      version: 1,
      onRehydrateStorage: () => {
        // Asegurarse de que el estado inicial sea limpio
        localStorage.removeItem('aibusinessolutions-storage')
      }
    }
  )
)

// Limpiar el estado persistido al cargar
useStore.getState().clearPersistedState()

export default useStore