import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import logo from '../img/logo.png'
import logoDark from '../img/logo_dark.png'
import ToggleTheme from './Togle'

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Guia de Segurança', to: '/guiaSeguranca' },
  { name: 'Contato', to: '/contato' },
  { name: 'EducaCidade', to: '/educa' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`${isHome ? 'absolute top-0 left-0 right-0 z-[1100]' : 'relative'} transition-colors duration-300`}>
      <header className={isHome ? '' : 'shadow-sm bg-[#1890d6] dark:bg-gray-900'}>
        <nav
          aria-label="Global"
          className={`flex items-center justify-between p-4 lg:px-8 ${
            isHome 
              ? 'bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm' 
              : ''
          }`}
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
              <span className="sr-only">Risk Map</span>
              <img 
                alt="logo" 
                src={logo} 
                className="w-20 lg:w-16 drop-shadow-lg" 
              />
              <span className={`text-xl font-bold drop-shadow-lg ${
                isHome ? 'text-white' : 'text-white'
              }`}>
                Risk Mapping
              </span>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`px-3 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold ${
                  isHome
                    ? 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ToggleTheme />
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-[1100] bg-black/30 backdrop-blur-sm" />
          <DialogPanel className="fixed inset-y-0 right-0 z-[1101] w-full overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Risk Map</span>
                <img alt="logo" src={logoDark} className="h-8 w-auto dark:hidden" />
                <img alt="logo" src={logo} className="h-8 w-auto hidden dark:block" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-800 dark:text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-300 dark:divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300 shadow-md hover:shadow-lg text-base font-semibold text-gray-800 dark:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <ToggleTheme />
                </div>
                <div className="py-6 invisible">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/5"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  )
}