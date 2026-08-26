import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'life-and-times-bh88mzno',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_zCtoUx_hfAVc35uStaAK-AXIljyxlK2r',
  authRequired: false,
  auth: { mode: 'managed' },
})
