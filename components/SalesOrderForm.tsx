"use client"; // Runs in the browser: it needs state and user interaction

import { useActionState } from "react";
import { createOrder } from "@/app/sales-orders/actions";
import { ITEMS, type FormState } from "@/lib/types";

const initialState: FormState = {};

export default function SalesOrderForm({ today }: { today: string }) {
  // useActionState calls our Server Action and gives back its result (errors/messages)
  const [state, formAction, pending] = useActionState(createOrder, initialState);

  return (
    <form action={formAction} className="grid">
      <Field label="Customer" name="customer" error={state.errors?.customer}>
        <input id="customer" name="customer" required minLength={3} placeholder="e.g. Brookfield, CT" />
      </Field>

      <Field label="Customer email" name="email" error={state.errors?.email}>
        <input id="email" name="email" type="email" required defaultValue="test@romtech.com" />
      </Field>

      <Field label="Subsidiary" name="subsidiary" error={state.errors?.subsidiary}>
        <select id="subsidiary" name="subsidiary" required defaultValue="ROM Technologies INC.">
          <option>ROM Technologies INC.</option>
        </select>
      </Field>

      <Field label="PO #" name="poNumber" error={state.errors?.poNumber}>
        <input id="poNumber" name="poNumber" required pattern="PO-[0-9]{5}" placeholder="PO-12345" />
      </Field>

      <Field label="Items (Ctrl/Cmd + click for more than one)" name="items" error={state.errors?.items}>
        <select id="items" name="items" multiple size={3} required>
          {ITEMS.map((item) => <option key={item}>{item}</option>)}
        </select>
      </Field>

      <Field label="Quantity" name="quantity" error={state.errors?.quantity}>
        <input id="quantity" name="quantity" type="number" required min={1} max={500} placeholder="1 – 500" />
      </Field>

      <Field label="Ship date" name="shipDate" error={state.errors?.shipDate}>
        <input id="shipDate" name="shipDate" type="date" required defaultValue={today} />
      </Field>

      <Field label="Ship-from location" name="shipFrom" error={state.errors?.shipFrom}>
        <input id="shipFrom" name="shipFrom" defaultValue="Brookfield, CT" />
      </Field>

      <div className="full">
        <label htmlFor="memo">Memo</label>
        <textarea id="memo" name="memo" rows={2} maxLength={200} placeholder="Internal note (max 200 characters)" />
      </div>

      <div className="full">
        <button type="submit" className="primary" disabled={pending}>
          {pending ? "Saving…" : "Save Sales Order"}
        </button>
      </div>

      {state.message && <p className="status err full" role="alert">{state.message}</p>}
    </form>
  );
}

// A small reusable component: label + input + error message
function Field({ label, name, error, children }: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {children}
      <div className="field-error">{error}</div>
    </div>
  );
}