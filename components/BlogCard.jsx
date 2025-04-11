import Link from "next/link";

export default function BlogCard({ title, description, image, id }) {
    return (
        <div className="col mb-4">
            <div className="card h-100 mx-2">
                <Link className="nav-link" href={`blog/${id}`}>
                    <img src={image} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}