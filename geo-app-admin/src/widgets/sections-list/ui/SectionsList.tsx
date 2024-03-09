
import { DeleteSectionButton } from "@features/deleteSection";
import { EditSectionButton } from "@features/editSection";
import { BaseSection } from "@entities/sections";
import { AppTable, AppTableColumn } from "@shared";

export interface SectionsListProps {
    data: BaseSection[];
    loading: boolean;

}
export function SectionsList({ data, loading }: SectionsListProps) {
    const columns: AppTableColumn<BaseSection>[] = [
        {
            title: 'ID',
            key: 'id',
            render: (item: BaseSection) => <span>{item.id}</span>
        },
        {
            title: 'Картинка',
            key: 'imageUrl',
            render(item) {
                if (!item.imageUrl) return '-'
                return <img src={item.imageUrl} style={{ width: '100%' }} />
            },
        },
        {
            title: 'Название',
            key: 'title',
            render: (item: BaseSection) => <span>{item.title}</span>
        },


        {
            title: '',
            key: 'edit',
            render: (item) => <>
                <EditSectionButton sectionId={item.id} />
                <DeleteSectionButton sectionId={item.id} />
            </>
        }
    ];
    return <>
    <AppTable loading={loading} columns={columns} items={data || []} summary={[
            {
                title: 'Всего секций',
                value: data.length || 0
            }
        ]} />
    </>
}