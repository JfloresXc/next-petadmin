
import { handleError } from '@/utils/error'
import { useLoading } from './useLoading'

export const useError = () => {
  const { showLoading, hideLoading } = useLoading()

  const tryCatchReturn = async (callback) => {
    showLoading()
    try {
      const response = await callback()
      handleError(response)
      hideLoading()
      return response
    } catch (error) {
      hideLoading()
      handleError({ isError: true })
    }
  }

  const tryCatchAction = async (firstCallback, secondCallback) => {
    showLoading()
    try {
      const response = await firstCallback()
      hideLoading()
      const { isError } = handleError(response)
      if (!isError) secondCallback(response)
      return response
    } catch (error) {
      console.error(error)
      hideLoading()
      handleError({ isError: true })
    }
  }

  return {
    tryCatchReturn,
    tryCatchAction
  }
}
