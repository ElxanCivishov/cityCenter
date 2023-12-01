import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

export const getContacts = createAsyncThunk(
  "contact/get-contacts",
  async (thunkAPI) => {
    try {
      return await contactService.getContacts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/create-contact",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.createContact(contactData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getContact = createAsyncThunk(
  "contact/get-contact",
  async (id, thunkAPI) => {
    try {
      return await contactService.getContact(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/delete-contact",
  async (id, thunkAPI) => {
    try {
      return await contactService.deleteContact({ id });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  contacts: [],
  contact: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    RESET: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch contacts
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.contacts = payload;
      })
      // fetch one contact
      .addCase(getContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Xəta baş verdi yenidəm cəhd edin.";
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.contact = payload;
      })
      .addCase(getContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Xəta baş verdi yenidəm cəhd edin.";
      })
      //  create new contact
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts.push(payload);
        state.message = "Müraciət göndərildi.";
      })
      .addCase(createContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Xəta baş verdi yenidəm cəhd edin.";
      })

      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = state.contacts.filter((c) => c.id !== payload);
        state.message = "Müraciət silindi";
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Xəta baş verdi yenidəm cəhd edin.";
      });
  },
});

export const { RESET } = contactSlice.actions;
export default contactSlice.reducer;
