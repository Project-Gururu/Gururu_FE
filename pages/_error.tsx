import { NextPageContext } from 'next'
import ErrorNext from 'next/error'

function Error({ statusCode }: { statusCode: number }) {
  return <ErrorNext statusCode={statusCode} />
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
