
import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
const getData = async () => {
  await delay(3000)
  return 'Hello World'
}

export async function loader() {
  return defer({ message: getData() })
}

const DeferredComponent = () => {
  const data = useLoaderData<typeof loader>()
  return (
      <div>
        This will always show.
        <Suspense fallback={<p>Loading hello world...</p>}>
          <Await resolve={data.message} errorElement={<p>Error loading message</p>}>
            {message => <p>This is your message: {message}</p>}
          </Await>
        </Suspense>
      </div>
  )
}

export default DeferredComponent