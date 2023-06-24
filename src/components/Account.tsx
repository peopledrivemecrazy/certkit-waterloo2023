import { useAccount,  } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  // const { data: ensName } = useEnsName({ address })

  return (
    <div>
     {address}
    </div>
  )
}
