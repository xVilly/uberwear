import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../requests';

export function CreateAccountPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const city = formData.get('city') as string;
    const district = formData.get('district') as string;
    const postcode = formData.get('postcode') as string;
    const street = formData.get('street') as string;

    if (password !== confirmPassword) {
      enqueueSnackbar('Hasła nie są takie same', { variant: 'error' });
      return;
    }

    const { status, data } = await createAccount(
      email,
      password,
      name,
      surname,
      phone,
      street,
      city,
      postcode,
      district
    );

    if (status === 200) {
      enqueueSnackbar('Konto zostało utworzone', { variant: 'success' });
      navigate('/login');
    } else {
      enqueueSnackbar('Wystąpił błąd podczas tworzenia konta', { variant: 'error' });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#1E3A5F] text-white font-serif flex-col">
      {/* Header */}
      <h1 className="mb-5 text-4xl">
        Zakupy szybko i w Twoim stylu - zacznij teraz.
      </h1>

      {/* Input Form */}
      <form className="flex flex-wrap w-1/3" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="flex flex-col w-[40%] p-2">
          <label className="text-lg">
            Email:
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="Wprowadź email"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-[60%] p-2">
          <label className="text-lg">
            Numer telefonu:
          </label>
          <input
            name="phone"
            type="text"
            required
            placeholder="Wprowadź numer telefonu"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-1/2 p-2">
          <label className="text-lg">
            Imię:
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="Wprowadź pierwsze imię"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-1/2 p-2">
          <label className="text-lg">
            Nazwisko:
          </label>
          <input
            name="surname"
            type="text"
            required
            placeholder="Wprowadź nazwisko"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-1/2 p-2">
          <label className="text-lg">
            Hasło:
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="Wprowadź hasło"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col w-1/2 p-2">
          <label className="text-lg">
            Powtórz Hasło:
          </label>
          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Wprowadź hasło jeszcze raz"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        {/* Address Fields */}
        <div className="flex flex-col w-[30%] p-2">
          <label className="text-lg">
            Miasto:
          </label>
          <input
            name="city"
            type="text"
            required
            placeholder="Wprowadź miasto"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-[70%] p-2">
          <label className="text-lg">
            Ulica:
          </label>
          <input
            name="street"
            type="text"
            required
            placeholder="Wprowadź ulice"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-[40%] p-2">
          <label className="text-lg">
            Kod pocztowy:
          </label>
          <input
            name="postcode"
            type="text"
            required
            placeholder="Wprowadź kod pocztowy"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        <div className="flex flex-col w-[60%] p-2">
          <label className="text-lg">
            Dzielnica:
          </label>
          <input
            name="district"
            type="text"
            required
            placeholder="Wprowadź dzielnicę"
            className="w-full p-2 mt-1 rounded border border-gray-300 text-black bg-white"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            type="submit"
            className="w-1/2 p-2 rounded-lg bg-[#1E3A5F] text-white font-bold border-2 shadow-md hover:scale-110 hover:shadow-lg border-yellow-500 text-lg cursor-pointer mt-2 transition-all duration-200"
            onClick={() => {}}
          >
            Utwórz Konto
          </button>
        </div>
      </form>
    </div>
  );
}
