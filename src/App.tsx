import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import type { Cipo } from "./types/cipo"

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  useEffect(() => {
    async function betolt() {
      const response = await fetch("http://localhost:3000/cipok");
      const data = await response.json() as Cipo[];

      setCipok(data);
    }
    betolt()
  }, [])

  async function felvetel(e) {
    e.preventDefault();
    const uj = {
      brand: e.target.brand.value,
      model: e.target.model.value,
      price: e.target.price.value,
      size: e.target.size.value,
      inStock: e.target.inStock.checked,
      releaseDate: e.target.releaseDate.value
    };

    const response = await fetch("http://localhost:3000/cipok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uj)
    });
    setCipok([...cipok, await response.json()]);
  }

  return (
    <>
      <h1>Cipők</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Márka</th>
            <th>Model</th>
            <th>Ár</th>
            <th>Méret</th>
            <th>Raktáron</th>
            <th>Megjelenés dátum</th>
          </tr>
        </thead>
        <tbody>
          {cipok.map(c => (
            <tr key={c.id}>
              <td>{c.brand}</td>
              <td>{c.model}</td>
              <td>{c.price}</td>
              <td>{c.size}</td>
              <td>{c.inStock ? "Van" : "Nincs"}</td>
              <td>{c.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={felvetel}>
        <label htmlFor="brand" className="form-label">Márka:</label>
        <input type="text" name="brand" className="form-control" />

        <label htmlFor="model" className="form-label">Model:</label>
        <input type="text" name="model" className="form-control" />

        <label htmlFor="price" className="form-label">Ár:</label>
        <input type="number" name="price" className="form-control" />

        <label htmlFor="size" className="form-label">Méret:</label>
        <input type="Number" name="size" className="form-control" />

        <label htmlFor="releaseDate" className="form-label">Kiadás:</label>
        <input type="date" name="releaseDate" className="form-control" />

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="inStock" />
          <label className="form-check-label" htmlFor="inStock">
            Raktáron
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Felvétel</button>
      </form>
    </>
  )
}

export default App