// GraphQL utility for WPGraphQL API

const ENDPOINT = import.meta.env.PUBLIC_WPGRAPHQL_ENDPOINT || 'https://pdf.live/resources/graphql'

type GraphqlResponse<T> = {
  data?: T
  errors?: Array<{ message: string }>
}

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`)
  }

  const json = await response.json() as GraphqlResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map(err => err.message).join('; '))
  }

  if (!json.data) {
    throw new Error('No data returned from WPGraphQL.')
  }

  return json.data
}
