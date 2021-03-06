import { Dropdown, Menu, Modal, Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./utils";
import { IList } from "type/project";
import { IUsers } from "type/user";

interface IProps extends TableProps<IList> {
  users: IUsers[];
}
const List = (props: IProps) => {
  const { users, ...param } = props;

  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();
  const { mutate: mutate_ } = useDeleteProject();

  //~这种写法叫做函数柯里化，在调用前期就知道的参数是id,在调用时知道的参数是pin
  const handleEdit = (id: number) => (pin: boolean) => mutate({ id, pin });

  const editProject = (id: number) => () => startEdit(id);
  const deleteProject = (id: number) => () => {
    Modal.confirm({
      title: "确定删除吗？",
      content: "点击删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        mutate_({ id });
      },
    });
  };

  const columns: ColumnsType<IList> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render: (_, record) => {
        //bug:由于数据返回乱码问题，暂时这样处理

        return (
          <Pin checked={record.pin} onCheckedChange={handleEdit(record.id)} />
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => {
        return <Link to={String(record.id)}>{name}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render(_, record) {
        return (
          <span>
            {users.find((item) => item.id === record.personId)?.name || "无"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      render(_, record) {
        return (
          <span>
            {record.created ? dayjs(record.created).format("YYYY-MM-DD") : "无"}
          </span>
        );
      },
    },
    {
      render: (_, record) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit">
                  <ButtonNoPadding type="link" onClick={editProject(record.id)}>
                    编辑
                  </ButtonNoPadding>
                </Menu.Item>

                <Menu.Item key="delete">
                  <ButtonNoPadding
                    type="link"
                    onClick={deleteProject(record.id)}
                  >
                    删除
                  </ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type="link">...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];

  return <Table columns={columns} pagination={false} {...param} rowKey="id" />;
};

export default List;
