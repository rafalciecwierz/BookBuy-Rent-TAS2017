# Ebooking - online ebook renting


TODO:

1. Serwer FTP (?) do zapisywania okładek ksiazek (jpg) i avatarów.
  - w jaki sposób będziemy zapisywać na serwerze obrazki?

2. Baza danych
  Baza danych jest schowana za API w postaci jednego pliku js który exportuje funkcje do każdej z potrzebnych funkcjonalności, każda z funkcji zwraca dane w formacie JSON
  Tablice:
  - użytkownicy
      dane do logowania/rejestrowania: (username, email, password, avatar)
  - książki
    dane do listy: (tytuł, zdjecie okładki, autor, cena, tagi, like)
    dane do przegladu: (tytuł, autor, okładka, cena, opis, tagi)

    - jak zrobić komentarze do książek???


4. Funkcjonalnosci:
  - Logowanie
  - Rejestracja
  - pobieranie strony głównej (lsty ksiazek) z bazy
    - szybkie dodawanie do koszyka
    - szybkie dodawanie do ulubionych
  - podgląd ksiązki (overview)
    - dodawanie do koszyka
    - dodawanie do ulubionych
    - ocenianie
    - komentarze
  - wyszukiwanie książek (obsługa wyszukiwania)

  // front - do zrobienia
  - panel administratora
    - dodawanie książek do oferty
  - zamawianie
    - formularz zamówienia
      - proces zamawiania: kup -> (mail z danymi do przelewu) -> (przelew) -> admin zatwierdza -> (mail z ebookiem) -> (ksiazka kupiona, możliwość oceny i komentowania)
  - wishlista (sekcja na profilu, lista ksiazek)
  - profil użytkowanika
    - wishlista
    - kupione
      - ocenianie i komentowanie
