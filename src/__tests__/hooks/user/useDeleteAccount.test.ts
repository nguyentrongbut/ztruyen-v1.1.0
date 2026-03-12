/* eslint-disable @typescript-eslint/no-explicit-any */

// ** Testing library
import { renderHook } from '@testing-library/react'

// ** Next
import { useRouter } from 'next/navigation'

// ** SWR
import useSWRMutation from 'swr/mutation'
import { mutate } from 'swr'

// ** Toast
import toast from 'react-hot-toast'

// ** Hook
import { useDeleteAccount } from '@/hooks/user/useDeleteAccount'

// ** Service
import { UserService } from '@/services/api/user'

// ** Config
import { CONFIG_TAG } from '@/configs/tag'

// ================= MOCKS =================
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

jest.mock('swr/mutation')

jest.mock('swr', () => ({
    mutate: jest.fn(),
}))

jest.mock('@/services/api/user', () => ({
    UserService: {
        deleteProfile: jest.fn(),
    },
}))

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}))

describe('useDeleteAccount', () => {
    const mockRefresh = jest.fn()
    const mockTrigger = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

        ;(useRouter as jest.Mock).mockReturnValue({
            refresh: mockRefresh,
        })

        ;(useSWRMutation as jest.Mock).mockReturnValue({
            trigger: mockTrigger,
        })
    })

    it('calls useSWRMutation with correct key', () => {
        renderHook(() => useDeleteAccount())

        expect(useSWRMutation).toHaveBeenCalledWith(
            CONFIG_TAG.USER.DELETE_PROFILE,
            expect.any(Function),
            expect.any(Object)
        )
    })

    it('calls UserService.deleteProfile when trigger runs', async () => {
        let fetcherFn: any

        ;(useSWRMutation as jest.Mock).mockImplementation((key, fetcher) => {
            fetcherFn = fetcher
            return { trigger: jest.fn() }
        })

        renderHook(() => useDeleteAccount())

        await fetcherFn()

        expect(UserService.deleteProfile).toHaveBeenCalledTimes(1)
    })

    it('shows success toast onSuccess', async () => {
        const mockResponse = { message: 'Xoá tài khoản thành công' }

        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        await options.onSuccess(mockResponse)

        expect(toast.success).toHaveBeenCalledWith(mockResponse.message)
    })

    it('clears profile cache onSuccess', async () => {
        const mockResponse = { message: 'Xoá tài khoản thành công' }

        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        await options.onSuccess(mockResponse)

        expect(mutate).toHaveBeenCalledWith(
            CONFIG_TAG.USER.PROFILE,
            null,
            false
        )
    })

    it('refreshes router onSuccess', async () => {
        const mockResponse = { message: 'Xoá tài khoản thành công' }

        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        await options.onSuccess(mockResponse)

        expect(mockRefresh).toHaveBeenCalledTimes(1)
    })

    it('shows error toast with error message when error is Error instance', async () => {
        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        const error = new Error('Delete failed')

        options.onError(error)

        expect(toast.error).toHaveBeenCalledWith('Delete failed')
    })

    it('shows default error toast when error is not Error instance', async () => {
        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        options.onError(null)

        expect(toast.error).toHaveBeenCalledWith(
            'Đã có lỗi xảy ra khi xoá tài khoản cá nhân'
        )
    })

    it('does not clear cache or refresh router when error occurs', async () => {
        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        const error = new Error('Delete failed')

        options.onError(error)

        expect(mutate).not.toHaveBeenCalled()
        expect(mockRefresh).not.toHaveBeenCalled()
    })

    it('executes all success side effects in correct order', async () => {
        const mockResponse = { message: 'Xoá tài khoản thành công' }
        const callOrder: string[] = []

        ;(toast.success as jest.Mock).mockImplementation(() => {
            callOrder.push('toast.success')
        })

        ;(mutate as jest.Mock).mockImplementation(() => {
            callOrder.push('mutate')
        })

        ;(useRouter as jest.Mock).mockReturnValue({
            refresh: () => {
                callOrder.push('router.refresh')
            },
        })

        let options: any

        ;(useSWRMutation as jest.Mock).mockImplementation(
            (key, fetcher, config) => {
                options = config
                return { trigger: jest.fn() }
            }
        )

        renderHook(() => useDeleteAccount())

        await options.onSuccess(mockResponse)

        expect(callOrder).toEqual(['toast.success', 'mutate', 'router.refresh'])
    })
})