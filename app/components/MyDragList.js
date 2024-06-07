import DraggableList from './DnD/DraggableList'

const testData = [
  {
    id: 'item-1',
    title: 'Scotland Island',
    location: 'Sydney, Australia',
    image: '/images/1.jpg',
  },
  {
    id: 'item-2',
    title: 'The Charles Grand Brasserie & Bar',
    location: 'Lorem ipsum, Dolor',
    image: '/images/2.jpg',
  },
  {
    id: 'item-3',
    title: 'Bridge Climb',
    location: 'Dolor, Sit amet',
    image: '/images/3.jpg',
  },
  {
    id: 'item-4',
    title: 'Scotland Island',
    location: 'Sydney, Australia',
    image: '/images/4.jpg',
  },
  {
    id: 'item-5',
    title: 'Clam Bar',
    location: 'Etcetera veni, Vidi vici',
    image: '/images/5.jpg',
  },
  {
    id: 'item-6',
    title: 'Vivid Festival',
    location: 'Sydney, Australia',
    image: '/images/6.jpg',
  },
]

// Render items in list
// You can customize item UIs for each cases like normal(no dragging), active(dragging) and drag(original item of dragging item)
function renderItem(status) {
  if (status === 'drag') {
    return (itemData) => (
      <div className="w-[288px] h-auto flex items-center gap-3 p-4 rounded-[8px] border-[1px] bg-white">
        <img
          src={itemData.image}
          alt={itemData.title}
          className="w-8 h-8 rounded-[5px]"
        />
        <div>
          <p className="font-medium text-[17px] leading-[22px] text-[#292B36] cursor-default">
            {itemData.title}
          </p>
        </div>
      </div>
    )
  } else {
    const extraClass =
      status === 'normal' ? 'border-white bg-white' : 'bg-gray-200 opacity-30'
    return (itemData) => (
      <div
        className={`h-auto flex items-center gap-6 px-10 py-5 border-y-[1px] ${extraClass}`}
      >
        <img
          src={itemData.image}
          alt={itemData.title}
          className="w-24 h-24 rounded-[12px]"
        />
        <div>
          <p className="font-bold text-[19px] leading-6 text-[#292B36]">
            {itemData.title}
          </p>
          <div className="flex items-center gap-1">
            <img src="/i.png" className="w-4 h-4" />
            <p className="h-[22px] font-normal align-text-bottom text-[#A8A9AE]">
              {itemData.location}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default function MyDragList() {
  return (
    <div className="min-h-screen bg-black p-6">
      <main className="max-w-2xl mx-auto">
        <DraggableList
          items={testData}
          normalRender={renderItem('normal')}
          activeRender={renderItem('active')}
          dragRender={renderItem('drag')}
        />
      </main>
    </div>
  )
}
