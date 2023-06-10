import React, { useEffect, useState, ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GroupFormData } from "../../types/group";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import {
    Error,
    FormCard,
    Input,
    InputDescription,
    Title,
    UsersSelector,
} from "@styles/pages/create/group.styles";
import LoadingButton from "@components/loading-button";
import { GroupSchema } from "../../types/schema";
import { createGroup, selectGroupState } from "@redux/slices/groupSlice";
import { selectUserState } from "@redux/slices/userSlice";
import { User } from "../../types/user";
import Spinner from "@components/spinner";
import useAlert from "../../hocs/useAlert";
import { getFormattedDate } from "../../utils/date";
import { useTranslation } from "react-i18next";

const GroupForm = (): ReactElement => {
    const { t } = useTranslation();
    const {
        isLoading: usersLoading,
        user,
        users,
    } = useSelector(selectUserState);
    const [selected, setSelected] = useState([
        {
            label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
            value: `${user?.id}`,
        },
    ]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<GroupFormData>({
        resolver: yupResolver(GroupSchema),
    });
    const dispatch = useDispatch();
    const {
        isLoading: groupLoading,
        success: groupSuccess,
        error: groupError,
    } = useSelector(selectGroupState);

    const { showAlert, AlertWrapper } = useAlert();

    const options: { label: string; value: string }[] = [];

    useEffect(() => {
        setSelected([
            {
                label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
                value: `${user?.id}`,
            },
        ]);
        setValue("data_created", getFormattedDate(new Date()));
    }, [user]);

    useEffect(() => {
        if (groupSuccess) {
            showAlert(
                t("components.alert.messages.successCreateGroup"),
                "success",
            );
        } else if (groupError) {
            showAlert(groupError, "error");
        }
    }, [groupSuccess, groupError]);

    users &&
        users?.map(
            (user: User) =>
                !user?.is_blocked &&
                options.push({
                    label: `${user?.first_name} ${user?.last_name}  email: ${user?.email}`,
                    value: `${user.id}`,
                }),
        );

    const onSubmit: SubmitHandler<GroupFormData> = (data) => {
        if (selected.length < 2) {
            showAlert(
                t("components.alert.messages.noEnoughPeopleError"),
                "error",
            );
        } else {
            data.usersIdList = selected.map((obj) => obj.value);
            dispatch(createGroup(data));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Title>{t("components.groupForm.title")}</Title>
            <FormCard>
                <Input
                    type="text"
                    {...register("name", {
                        required: t(
                            "components.groupForm.inputs.name.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t("components.groupForm.inputs.name.name") as string
                    }
                />
                <Error>{errors.name && <p>{errors.name.message}</p>}</Error>
                <InputDescription
                    {...register("description", {
                        required: t(
                            "components.groupForm.inputs.description.nameRequired",
                        ) as string,
                    })}
                    placeholder={
                        t(
                            "components.groupForm.inputs.description.name",
                        ) as string
                    }
                />
                <Error>
                    {errors.description && <p>{errors.description.message}</p>}
                </Error>
                {groupLoading && usersLoading ? (
                    <Spinner />
                ) : (
                    <UsersSelector>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            isLoading={usersLoading}
                            labelledBy={t("components.groupForm.select.label")}
                            ClearIcon={
                                <Image
                                    src="/icons/search_icon.svg"
                                    alt="Search icon"
                                    width={20}
                                    height={20}
                                    unoptimized
                                />
                            }
                            ClearSelectedIcon={
                                <Image
                                    src="/icons/delete_icon.svg"
                                    alt="Delete icon"
                                    width={20}
                                    height={20}
                                    unoptimized
                                />
                            }
                        />
                    </UsersSelector>
                )}
                <Error>
                    {errors.usersIdList && <p>{errors.usersIdList.message}</p>}
                </Error>
                <LoadingButton
                    loading={groupLoading}
                    disabled={false}
                    variety="CreateGroup"
                >
                    {groupLoading
                        ? t("components.groupForm.createButton.loadingButton")
                        : t("components.groupForm.createButton.text")}
                </LoadingButton>
            </FormCard>
            <AlertWrapper />
        </form>
    );
};

export default GroupForm;
