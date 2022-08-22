import { useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { reset, deleteProduct } from "store/reducers/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ProductScreen = () => {
  const theader = [
    "ID",
    "Image",
    "Nom",
    "Prix",
    "Catégorie",
    "Marque",
    "Action",
  ];

  const productse = [
    {
      name: "Pomme",
      prix: "$50.00",
      category: "Fruits",
      marque: "fruits",
    },
    {
      name: "Pomme",
      prix: "$50.00",
      category: "Fruits",
      marque: "fruits",
    },
    {
      name: "Pomme",
      prix: "$50.00",
      category: "Fruits",
      marque: "fruits",
    },
    {
      name: "Pomme",
      prix: "$50.00",
      category: "Fruits",
      marque: "fruits",
    },
    {
      name: "Pomme",
      prix: "$50.00",
      category: "Fruits",
      marque: "fruits",
    },
  ];
  const { products, isError, isSuccess, message, isLoading } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("Produit supprimé");
      dispatch(reset());
    }
  }, [dispatch, isError, message, isSuccess]);

  const deleteProducts = (id: any) => {
    MySwal.fire({
      title: "Etes vous sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then((result: any) => {
      console.log(result);
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        if (isSuccess) {
          Swal.fire("Supprimer", "Produit supprimer avec succés");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center w-">
        <Loading width="w-36 h-36" />
      </div>
    );
  }

  return (
    <section className="mb-36">
      <div className="containers">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[25px] text-dark-gray ">Produits</h1>
          <Link href="/admin/addproduct">
            <button className="text-white capitalize bg-primary text-sm font-medium  h-10 rounded-md px-3">
              Ajouter un produit
            </button>
          </Link>
        </div>
        <div className="overflow-auto rounded-lg shadow-md">
          <table className=" w-full ">
            <thead className="bg-gray-50 border-b-2 table-auto border-gray-200">
              <tr>
                {theader.map((item, idx) => (
                  <th
                    key={idx}
                    className="p-4 text-center  text-sm font-semibold tracking-wide text-[#2b2b2b]"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product: any, idx: any) => (
                  <tr
                    key={idx}
                    className="bg-white border-b border-gray-200 even:bg-gray-50"
                  >
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div>{products && product._id}</div>
                    </td>

                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div className="text-xs flex items-center justify-center w-full h-full text-white">
                        <Image
                          alt="images"
                          src={products && product.image[0].url}
                          width={42}
                          height={42}
                        />
                      </div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div>{product.name}</div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div>{products && product.price}</div>
                    </td>
                    <td className="p-4 min-w-[161px] text-center text-sm  text-[#8f8f8f]">
                      <div className="font-medium">
                        {products && product.category}
                      </div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div className="flex justify-center items-center">
                        <div>{products && product.brand}</div>
                      </div>
                    </td>
                    <td className="p-4 min-w-[94px] text-center text-sm  text-[#8f8f8f]">
                      <div className="w-full h-full flex justify-around items-center">
                        <Link
                          href={{
                            pathname: `/admin/${product._id}`,
                          }}
                        >
                          <div>
                            <TbEdit className="text-white text-[25px] bg-orange-500 p-1 rounded-md cursor-pointer" />
                          </div>
                        </Link>
                        <BsTrash
                          className="text-white text-[25px] bg-red-500 p-1  rounded-md cursor-pointer"
                          onClick={() => deleteProducts(product && product._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductScreen;

//  function BlogLink() {
//   return (
//     <Link
//       href={{
//         pathname: '/blog/[post]/[comment]',
//         query: { post: 'post-1', comment: 'comment-1' },
//       }}
//     >
//       <a>Valid link</a>
//     </Link>
//   )
// }
