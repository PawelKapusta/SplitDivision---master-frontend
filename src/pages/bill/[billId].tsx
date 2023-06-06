import React, { useEffect } from "react";
import { NextPage } from "next";
import { withAuth } from "../../hocs/withAuth";
import { useRouter } from "next/router";
import { fetchBill, selectBillState } from "@redux/slices/billSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "@components/spinner";
import Image from "next/image";
import { getFormattedDate } from "../../utils/date";
import Flag from "react-world-flags";

const Bill: NextPage = () => {
    const router = useRouter();
    const { billId } = router.query;
    const dispatch = useDispatch();
    const { isLoading, bill } = useSelector(selectBillState);
    console.log("bill", bill);
    useEffect(() => {
        dispatch(fetchBill(billId as string));
    }, [billId]);

    return (
        <Container>
            {isLoading ? (
                <Spinner />
            ) : (
                <BillContainer>
                    <BillCardContent isLongDescription={false}>
                        <BillCardTitle>
                            <p>{bill?.name}</p>
                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                Start: {getFormattedDate(bill?.data_created)}
                            </p>

                            <p>
                                <Image
                                    src="/icons/calendar-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Calendar-icon.svg"
                                />
                                End: {getFormattedDate(bill?.data_end)}
                            </p>
                            <BillAmount>
                                <p>
                                    {" "}
                                    {bill &&
                                        bill.currency_type
                                            .toLocaleString()
                                            .toUpperCase() && (
                                            <Flag
                                                code={bill?.currency_code.substring(
                                                    0,
                                                    2,
                                                )}
                                                height={30}
                                                width={45}
                                            />
                                        )}
                                </p>
                                <p>
                                    <strong>Debt:</strong> {bill?.debt}{" "}
                                    {bill?.currency_code}
                                </p>
                            </BillAmount>
                            <BillCardActions>
                                <Image
                                    src="/icons/edit-icon.svg"
                                    width={30}
                                    height={30}
                                    alt="Edit-icon.svg"
                                />
                                <Image
                                    src="/icons/delete_icon_white.svg"
                                    width={30}
                                    height={30}
                                    alt="Delete-icon.svg"
                                />
                            </BillCardActions>
                        </BillCardTitle>
                        <BillCardDescription isLongDescription={false}>
                            <p>{bill?.description}</p>
                        </BillCardDescription>
                        <BillCardImage>
                            <Image
                                src="/images/bill-content-image.png"
                                width={500}
                                height={500}
                                alt="Bill-content-image.png"
                            />
                        </BillCardImage>
                    </BillCardContent>

                    {/*<BillImageContainer>*/}
                    {/*    <BillImage src={bill?.bill_image} alt="Bill Image" />*/}
                    {/*</BillImageContainer>*/}
                    {/*<BillQRCode>*/}
                    {/*    <QRCode src={bill?.code_qr} alt="QR Code" />*/}
                    {/*</BillQRCode>*/}
                </BillContainer>
            )}
        </Container>
    );
};

export default withAuth(Bill);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BillContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    width: 90%;

    & > * {
        background-color: ${({ theme }) => theme.colors.gold};
    }
`;

const BillCardContent = styled.div<{ isLongDescription: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.colors.gold};
    margin-top: 30px;
    height: ${({ isLongDescription }) =>
        isLongDescription ? " 450px" : "400px"};
    color: black;
    border-radius: 20px;
    width: 80%;
`;

export const BillCardTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-top: 20px;
    margin-left: 10px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.gold};
    text-align: center;
    border-radius: 20px;

    p:nth-child(1) {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 15px;
    }

    p:nth-child(2),
    p:nth-child(3) {
        img {
            margin-right: 15px;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        text-align: center;
        margin-top: 20px;
    }
    & * {
        background-color: ${({ theme }) => theme.colors.gold};
    }
`;

export const BillCardActions = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 100%;

    img {
        cursor: pointer;
        border-radius: 30px;
        height: 30px;
        width: 50px;
    }

    img:hover {
        box-shadow: 0 5px 10px 0 #fff;
    }
`;

export const BillCardDescription = styled.div<{ isLongDescription: boolean }>`
    background-color: ${({ theme }) => theme.colors.gold};
    padding: 20px;
    height: 300px;
    width: 50%;
    font-size: 20px;
    line-height: ${({ isLongDescription }) =>
        isLongDescription ? "  1.1" : " 1.5"};

    & * {
        background-color: ${({ theme }) => theme.colors.gold};
    }
`;

export const BillCardImage = styled.div`
    background-color: ${({ theme }) => theme.colors.gold};
    border-radius: 20px;
    padding: 10px;
    width: 30%;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;

const BillAmount = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    margin-top: 50px;

    & > * {
        background-color: ${({ theme }) => theme.colors.gold};
    }

    h3 {
        font-size: 20px;
        margin-bottom: 10px;
        text-align: center;
    }

    p {
        font-size: 16px;
        margin-bottom: 5px;
        text-align: center;
        & > * {
            background-color: ${({ theme }) => theme.colors.gold};
        }
    }
`;

const BillImageContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const BillImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const BillQRCode = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const QRCode = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
`;
