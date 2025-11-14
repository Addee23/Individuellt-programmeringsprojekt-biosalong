import { Formik, Form, Field, ErrorMessage } from "formik";

export default function BookingForm({ onSubmit, onCancel, selectedSeats }) {
  return (
    <div className="booking-form">
      <h2>Boka {selectedSeats.length} platser</h2>

      <Formik
        initialValues={{ name: "", phone: "" }}
        
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Namn krävs";
          } else if (values.name.length < 2) {
            errors.name = "Minst 2 tecken";
          }

          if (!values.phone) {
            errors.phone = "Telefon krävs";
          } else if (!/^[0-9+\s-]+$/.test(values.phone)) {
            errors.phone = "Endast siffror och + - tillåtna";
          }

          return errors;
        }}

        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values.name, values.phone);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>

            <label>
              Namn:
              <Field name="name" placeholder="Ditt namn" />
              <ErrorMessage name="name" component="p" style={{ color: "red" }} />
            </label>

            <label>
              Telefon:
              <Field name="phone" placeholder="Ditt telefonnummer" />
              <ErrorMessage name="phone" component="p" style={{ color: "red" }} />
            </label>

            <div className="form-buttons">
              <button type="submit" disabled={isSubmitting}>
                Skicka bokning
              </button>
              <button type="button" onClick={onCancel}>
                Avbryt
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
}
