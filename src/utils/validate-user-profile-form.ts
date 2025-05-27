type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
};

type EditableAddress = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function validateUserProfileForm(
  formData: FormData,
  addresses: EditableAddress[]
): Map<string, string> {
  const errors = new Map<string, string>();

  const { email, firstName, lastName, dateOfBirth } = formData;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.set('email', 'Please enter a valid email address.');
  }

  if (!firstName || !/^[a-zA-Z]+$/.test(firstName)) {
    errors.set('firstName', 'First name must contain only letters.');
  }

  if (!lastName || !/^[a-zA-Z]+$/.test(lastName)) {
    errors.set('lastName', 'Last name must contain only letters.');
  }

  if (!dateOfBirth) {
    errors.set('dateOfBirth', 'Please enter a valid birthday.');
  } else {
    const today = new Date();
    const dobDate = new Date(dateOfBirth);
    const age = today.getFullYear() - dobDate.getFullYear();
    const ageTooYoung =
      age < 13 ||
      (age === 13 && today.getMonth() < dobDate.getMonth()) ||
      (age === 13 &&
        today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate());

    if (ageTooYoung) {
      errors.set('dateOfBirth', 'You must be at least 13 years old.');
    }
  }

  addresses.forEach((addr, index) => {
    if (!addr.streetName || addr.streetName.trim().length === 0) {
      errors.set(`address[${index}].streetName`, 'Street must not be empty.');
    }

    if (!addr.city || !/^[a-zA-Z]+$/.test(addr.city)) {
      errors.set(`address[${index}].city`, 'City must contain only letters.');
    }

    if (
      !addr.postalCode ||
      !/^\d{6}$|^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(addr.postalCode)
    ) {
      errors.set(
        `address[${index}].postalCode`,
        'Postal code must match the country format.'
      );
    }

    if (!addr.country || addr.country.trim() === '') {
      errors.set(`address[${index}].country`, 'Please provide a country.');
    }
  });

  return errors;
}
