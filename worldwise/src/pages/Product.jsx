import styles from "../styles/product.module.css";
import PageNav from "../components/PageNav";
function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="img-1.jpg" alt="overview of a large city with skyscrapers" />
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Product;
