# Draft — do not send until Barric/Libby approve

To: synapsys@modmed.com
Subject: Partner API access — Liora Dermatology / Precision Weight + Wellness

Hello,

We operate Liora Dermatology & Aesthetics on EMA (lioraderm.modmedapp.com) and are building a weight-management program (Precision Weight + Wellness) on the same tenant.

We need proprietary partner access for Liora, plus practice grant, so we can:

1. Confirm whether Observation CREATE is on the proprietary roadmap (weight, waist, BP). Today we treat certified Observation as read-only and keep vitals in our own store.
2. Confirm MedicationRequest / e-Rx write is not available (we expect no). Libby will continue to sign prescriptions in EMA.
3. Sandbox the writeables we already see documented: MedicationStatement, Composition, Binary → DocumentReference.

We will not invent production writes. Rate limit (1,250/min) is fine.

Thank you,
Barric Reed
