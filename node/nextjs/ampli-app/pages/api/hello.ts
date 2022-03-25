// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import '../../lib/init-ampli';
import { ampli } from '../../lib/ampli';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = 'ampli-nextjs-user-id'; // get user id from request object (cookie, ...)
  ampli.eventWithOptionalProperties(userId, {optionalString: 'server-side event'}, undefined, { 'extra-key': 'extra-value' })

  res.status(200).json({})
}
