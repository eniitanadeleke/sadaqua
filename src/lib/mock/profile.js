// The logged-in giver's account details (Figma: Giver Profile).
// The real values will come from the backend for whoever is logged in.

export const GIVER_PROFILE = {
  fullName: "John Doe",
  email: "email@example.com",
  countryCode: "+234",
  phone: "8012345678",
  photo: null,
};

// The logged-in recipient's account details (Figma: Profile, "Accessible by
// Recipient users"). Same first name as the Recipient Home greeting.
export const RECIPIENT_PROFILE = {
  fullName: "Ahmed Bello",
  email: "ahmed@example.com",
  countryCode: "+234",
  phone: "8012345678",
  photo: null,
  // How the name shows on published requests: full | first | initials | anonymous
  nameDisplay: "first",
};
