import { ExICar } from "@/src/api/car/cars.types";
import { Button, Card, Carousel, Modal, Spin, Typography, Form, Input } from "antd";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import s from "./style.module.scss";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";
import cn from "classnames";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useLazyDeleteCarbyIDQuery, useLazyUpdateCarByIDQuery } from "@/src/api/car";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/src/constants/constants";

export const CarCard: FC<{ car: ExICar; isProfile: boolean; onRefetch: () => void }> = ({
  car,
  isProfile,
  onRefetch,
}) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const { push } = useRouter();
  const [triggerDelete, { isLoading: isDeleting }] = useLazyDeleteCarbyIDQuery();
  const [triggerUpdate, { isLoading: isUpdating }] = useLazyUpdateCarByIDQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const images = car.Photos.split(",");
    const photoUrls = images.map((photo) => {
      const url = ParseStringToPhoto(photo);
      console.log("Image URL:", url);
      return url;
    });
    setPhotos(photoUrls);
  }, [car.Photos]);

  const handleDelete = async () => {
    await triggerDelete(car.ID ?? 0);
    onRefetch();
  };
  const handleRedirect = () => {
    if (car.ID) push(AppRoutes.Cars + `/${car.ID}`);
  };

  const handleEdit = () => {
    form.setFieldsValue(car);
    setIsModalOpen(true);
  };

  const handleUpdate = async (values: Partial<ExICar>) => {
    const changedFields: Partial<ExICar> = {};
    Object.keys(values).forEach((key) => {
      if (values[key as keyof ExICar] !== car[key as keyof ExICar]) {
        (changedFields[key as keyof ExICar] as any) = values[key as keyof ExICar];
      }
    });

    await triggerUpdate({ ID: car.ID, ...changedFields });
    setIsModalOpen(false);
    onRefetch();
  };

  if (isDeleting || isUpdating) return <Spin />;

  return (
    <Card>
      <div className={s.cardContainer}>
        <Carousel
          autoplay
          infinite
          effect="fade"
          fade
          style={{ width: isProfile ? 150 : 250, height: isProfile ? 150 : 250 }}
          dotPosition="left"
        >
          {photos.map((photo: string, index: number) => (
            <Image
              key={index}
              className={s.img}
              alt="car image"
              src={photo}
              width={isProfile ? 150 : 250}
              height={isProfile ? 150 : 250}
              quality={100}
            />
          ))}
        </Carousel>
        <div className={s.infoMore}>
          <div className={s.topHolder}>
            <p className={s.leftText}>
              <b style={{ fontSize: 20, marginLeft: "0.5rem" }}>
                {car.brand} {car.car_model}
              </b>
              <span>VIN: {car.vin_code.replace(/\w{4}$/, "****")}</span>
            </p>
            <b style={{ fontSize: 24 }}>{car.price} $</b>
          </div>
          <div className={cn(s.bottomHolder, { [s.bottomHolderProfile]: isProfile })}>
            {!isProfile && (
              <Card className={s.detailsInfo} styles={{ body: { padding: "1rem" } }}>
                <p>
                  Placement: <span>{car.placement}</span>
                </p>
                <p>
                  Vehicle status: <span>{car.status}</span>
                </p>
                <p>
                  Kilometers: <span>{car.kilometers}</span>
                </p>
              </Card>
            )}
            <div className={s.buttonsControl}>
              <Button onClick={handleRedirect} type="primary" className={s.moreInfo}>
                <InfoCircleOutlined />
                More
              </Button>
              {isProfile && (
                <>
                  <Button type="default" className={s.bottomBtn} onClick={handleEdit}>
                    <EditOutlined />
                  </Button>
                  <Button
                    type="default"
                    className={s.bottomBtn}
                    style={{ color: "var(--error)", border: "1px solid var(--error)" }}
                    onClick={handleDelete}
                  >
                    <DeleteOutlined />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Edit Car Details"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate} initialValues={car}>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="car_model" label="Model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="vin_code" label="VIN Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="placement" label="Placement" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="kilometers" label="Kilometers" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
