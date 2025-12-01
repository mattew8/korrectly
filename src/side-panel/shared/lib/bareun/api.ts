import { BareunRevisionDto, BareunResponseDto } from './types';

export async function fetchBareunRevision(
  data: BareunRevisionDto,
): Promise<BareunResponseDto> {
  const response = await fetch(
    `${process.env.BAREUN_SERVER_URL}/bareun.RevisionService/CorrectError`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BAREUN_API_KEY || '',
      },
      body: JSON.stringify(data),
    },
  );
  return response.json();
}
