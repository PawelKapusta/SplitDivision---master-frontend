import React, { ReactElement, useEffect } from "react";
import { withAdmin } from "../../hocs/withAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, selectGroupState } from "@redux/slices/groupSlice";
import Spinner from "@components/spinner";
import { Group } from "../../types/group";
import GroupCard from "@components/cards/group-card";
import { Title } from "@styles/pages/admin/admin.styles";
import useAlert from "../../hocs/useAlert";

const Groups = (): ReactElement => {
    const dispatch = useDispatch();
    const { isLoading, groups } = useSelector(selectGroupState);
    const { AlertWrapper } = useAlert();
    useEffect(() => {
        dispatch(fetchGroups());
    }, []);

    console.log("groups", groups);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    <Title>All groups</Title>
                    {!!groups &&
                        groups.map((group: Group) => {
                            return (
                                <GroupCard
                                    key={group.id}
                                    group={group}
                                    isAdmin
                                />
                            );
                        })}
                    {groups.length === 0 ? <h4>There are no groups!</h4> : null}
                    <AlertWrapper />
                </div>
            )}
        </div>
    );
};

export default withAdmin(Groups);
