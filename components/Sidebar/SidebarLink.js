import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SidebarLink ({ label, icon = 'grip-lines-vertical', href = '/admin/dashboard' }) {
  const router = useRouter()
  return (
    <>
        <Link href={href}>
            <div
            className={
                'text-xs uppercase py-3 font-bold block ' +
                (router.pathname.indexOf(href) !== -1
                  ? 'text-lightBlue-500 hover:text-lightBlue-600'
                  : 'text-blueGray-700 hover:text-blueGray-500')
            }
            >
            <i
                className={
                    `fas fa-${icon} mr-2 text-sm
                    ${router.pathname.indexOf(href) !== -1
                    ? 'opacity-75'
                    : 'text-blueGray-300'}`
                }
            ></i>{' '}
                {label}
            </div>
        </Link>
    </>
  )
}
