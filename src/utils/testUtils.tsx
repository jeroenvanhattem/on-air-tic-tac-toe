import { render } from "@testing-library/react"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"
import { store } from '../redux/store'

export const renderWithContext = (component: ReactNode) => {
  render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}